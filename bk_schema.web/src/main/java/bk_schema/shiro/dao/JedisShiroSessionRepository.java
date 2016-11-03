package bk_schema.shiro.dao;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.apache.shiro.session.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.ShardedJedis;
import redis.clients.jedis.exceptions.JedisException;
import bk_schema.security.api.ShiroSessionRepository;

public class JedisShiroSessionRepository extends JedisManager implements  ShiroSessionRepository {
	Logger logger = LoggerFactory.getLogger(JedisShiroSessionRepository.class);
   
	
	public void saveSession(Session session) {
		if(session==null || session.getId()==null){
			logger.error("session或者session id为空");
			return ;			
		}else{
			byte[] key=SerializationUtil.serialize(getRedisSessionKey(session.getId()));
		    byte[] value=SerializationUtil.serialize(session);
		    ShardedJedis  jedis=this.getJedis();
		    try{
		    	Long timeOut=session.getTimeout()/1000;
		    	jedis.set(key, value);
		    	jedis.expire(key, Integer.parseInt(timeOut.toString()));		    	
		    }
		    catch(JedisException e){
		    	logger.error("保存session失败", e);		    	
		    }finally{
		    	this.returnResource(jedis);		    	
		    }
		}		
	}
    
	public Session getSession(Serializable id) {
		if (id == null) {
			logger.error("id为空");
			return null;
		} else {
			Session session=null;
			ShardedJedis jedis=this.getJedis();
			try {
				byte[] key = SerializationUtil.serialize(getRedisSessionKey(id));
				byte[] value=jedis.get(key);
				if(value!=null){
					session=SerializationUtil.deserialize(value);
					Long timeOut = session.getTimeout() / 1000;
					jedis.expire(key, Integer.parseInt(timeOut.toString()));
				}
			} catch (JedisException e) {
				logger.error("获取id为" + id
						+ "的session失败", e);
			} finally{
				this.returnResource(jedis);				
			}
			return session;			
		}
	}

	public Collection<Session> getAllSessions() {
		ShardedJedis  jedis=this.getJedis();
		Set<Session> sessions=new HashSet<Session>();
		try {
			Set<byte[]>byteKeys=jedis.hkeys(SerializationUtil.serialize(this.REDIS_SHIRO_SESSION+"*"));
			if(byteKeys!=null &&byteKeys.size()>0){
				for (byte[] bs : byteKeys) {
					Session session=SerializationUtil.deserialize(jedis.get(bs));
					sessions.add(session);
				}
	 	}
		} catch (JedisException e) {
			logger.error("获取所有session失败", e);
		}
		finally{
			this.returnResource(jedis);
			
		}
		return sessions;
	}

	public void deleteSession(Serializable id) {
		  if(id==null){
			  logger.error("sessionId 为空");
			  return ;
		  } else{
			  		
			  ShardedJedis jedis=this.getJedis();
			
			try {
				jedis.del(SerializationUtil.serialize(getRedisSessionKey(id)));
			} catch (JedisException e) {
				logger.error("删除session失败",e);
			}  finally{
				this.returnResource(jedis);				
			}
		  
		  }

		  
	}
    
	private String getRedisSessionKey(Serializable sessionId){
		
		return this.REDIS_SHIRO_SESSION+sessionId;
		
	}
}

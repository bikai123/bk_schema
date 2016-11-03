package bk_schema.shiro.dao;

import org.springframework.beans.factory.annotation.Autowired;

import redis.clients.jedis.ShardedJedis;
import redis.clients.jedis.ShardedJedisPool;

public class JedisManager {

	public static final String REDIS_SHIRO_SESSION="BK_SCHEMA_SESSION";
	@Autowired
	private ShardedJedisPool jedisPool;
	
	public  ShardedJedis getJedis(){
		return jedisPool.getResource();		
	}
	public void returnResource(ShardedJedis jedis){
		if(jedis!=null){			
			jedis.close();
		}		
	}	
}

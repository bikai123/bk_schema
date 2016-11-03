package bk_schema.shiro.dao;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.apache.shiro.session.Session;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.session.mgt.eis.AbstractSessionDAO;
import org.apache.shiro.util.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.esotericsoftware.minlog.Log;

import bk_schema.security.api.SecurityConfig;
import bk_schema.security.api.ShiroSessionRepository;

public class CustomShiroSessionDao  extends  AbstractSessionDAO{
	  Logger logger = LoggerFactory.getLogger(CustomShiroSessionDao.class);
	//本地session仓库
	 private ConcurrentMap<Serializable,Session> sessions=new ConcurrentHashMap();
      @Autowired
	  private  SecurityConfig  securityConfig;
	  @Autowired
      private ShiroSessionRepository shiroSessionRepository;
 
	public void update(Session session) throws UnknownSessionException {
		 if(securityConfig.isSecurityDisabled()){
			this.storeSession(session.getId(), session);
		 }else{
			 shiroSessionRepository.saveSession(session);
		 }
		
	}
	public void delete(Session session) {
		if(session==null){			
			Log.error("session can not be null ,delete failed");
		}else{
			Serializable id=session.getId();
			 if(securityConfig.isSecurityDisabled()){
			 sessions.remove(id);		 
			 } else{			 
				 shiroSessionRepository.deleteSession(id);
			 }			
		}	
	}
	public Collection<Session> getActiveSessions() {
		// TODO Auto-generated method stub
		if(securityConfig.isSecurityDisabled()){
			Collection values= sessions.values();
			return (Collection)(CollectionUtils.isEmpty(values)?Collections.emptySet():Collections.unmodifiableCollection(values));
			 } else{			 
				return  shiroSessionRepository.getAllSessions();
			 }			
	}

	@Override
	protected Serializable doCreate(Session session) {
		Serializable  sessionId=this.generateSessionId(session);
		 this.assignSessionId(session, sessionId);
		 if(securityConfig.isSecurityDisabled()){
			 this.storeSession(sessionId,session);			 
		 } else{			 
			 shiroSessionRepository.saveSession(session);
		 }
		return sessionId;
	}

	@Override
	protected Session doReadSession(Serializable sessionId) {
	 if(securityConfig.isSecurityDisabled()){
		 return this.sessions.get(sessionId);
	 }else{
		return shiroSessionRepository.getSession(sessionId);
	 }
	 }
  
	 protected    Session storeSession(Serializable id,Session session){
		 if(id==null){
			 throw new NullPointerException("id argument cannot be null");		 
		 }else
		 {
		 return sessions.putIfAbsent(id, session);
		 }
	 }
}

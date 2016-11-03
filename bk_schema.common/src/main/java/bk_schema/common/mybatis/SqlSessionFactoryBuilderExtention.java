package bk_schema.common.mybatis;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.ibatis.exceptions.ExceptionFactory;
import org.apache.ibatis.executor.ErrorContext;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import bk_schema.common.mybatis.xml.XMLConfigBuilderExtention;

public class SqlSessionFactoryBuilderExtention extends SqlSessionFactoryBuilder {
	 @Override
	  public SqlSessionFactory build(InputStream inputStream, String environment, Properties properties) {
	    try {
	      XMLConfigBuilderExtention parser = new XMLConfigBuilderExtention(inputStream, environment, properties);
	      Configuration config = parser.parse();
	      return build(config);
	    } catch (Exception e) {
	      throw ExceptionFactory.wrapException("Error building SqlSession.", e);
	    } finally {
	      ErrorContext.instance().reset();
	      try {
	        inputStream.close();
	      } catch (IOException e) {
	        // Intentionally ignore. Prefer previous error.
	      }
	    }
	  }
	
}

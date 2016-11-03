package bk_schema.shiro.dao;

import java.io.*;
public class SerializationUtil {

	 public  static byte[] serialize(Object object){
		 ObjectOutputStream  oos=null;
		 try {
			 ByteArrayOutputStream bos= new ByteArrayOutputStream(512);
			 oos=new ObjectOutputStream(bos);
			 oos.writeObject(object);
			 oos.flush();
			 return bos.toByteArray();
		} catch (IOException e) {
            throw new IllegalArgumentException(e);
		}
			 finally{
			 if(oos!=null)		 
			 try {
				 oos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
         }		 
	 }
	 
	  public static<T> T deserialize(byte[] byteArray){
		    ObjectInputStream  ots=null;
		    try {			
		    	ots=new ObjectInputStream(new ByteArrayInputStream(byteArray));
		    	Object result=ots.readObject();
		    	return (T) result;
			} catch (Exception e) {
				throw new IllegalArgumentException(e);
			} finally{
				if(ots!=null){
					try {
						ots.close();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
				}
				
				
			}
		
		  
	  }
	 
	 
	 
	 
	 
	 
}

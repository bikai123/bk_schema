package bk_schema.machine.api;

public class Shebeifenlei {
 private String id;
 private String  text;
 private String parent;
 private int opened;

public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public String getText() {
	return text;
}
public void setText(String text) {
	this.text = text;
}


public String getParent() {
	return parent;
}
public void setParent(String parent) {
	this.parent = parent;
}
public int getOpened() {
	return opened;
}
public void setOpened(int opened) {
	this.opened = opened;
}
 
}

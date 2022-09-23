package com.chickenbandits.daeily.service.unit;

public class DocList {
    public String getId() { return id; }
    public boolean getIsPublic() { return isPublic; }

    public void setId(String id) { this.id = id; }
    public void setIsPublic(boolean isPublic) { this.isPublic = isPublic; }

    private String id;
    private boolean isPublic;
}

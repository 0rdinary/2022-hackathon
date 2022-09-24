package com.chickenbandits.daeily.domain.document;

public class DocList {
    public String getId() { return id; }
    public boolean getIsPublic() { return isPublic; }
    public String getTag() { return tag; }

    public void setId(String id) { this.id = id; }
    public void setIsPublic(boolean isPublic) { this.isPublic = isPublic; }
    public void setTag(String tag) { this.tag = tag; }

    private String id;
    private boolean isPublic;
    private String tag;
}

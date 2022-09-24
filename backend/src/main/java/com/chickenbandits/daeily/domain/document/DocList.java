package com.chickenbandits.daeily.domain.document;

import com.google.cloud.Timestamp;

public class DocList {
    public String getId() { return id; }
    public boolean getIsPublic() { return isPublic; }
    public String getTag() { return tag; }
    public String getTitle() { return title; }
    public Timestamp getDate() { return date; }
    public String getWriter() { return writer; }
    public int getUp() { return up; }

    public void setId(String id) { this.id = id; }
    public void setIsPublic(boolean isPublic) { this.isPublic = isPublic; }
    public void setTag(String tag) { this.tag = tag; }
    public void setTitle(String title) { this.title = title; }
    public void setDate(Timestamp date) { this.date = date; }
    public void setWriter(String writer) { this.writer = writer; }
    public void setUp(int up) { this.up = up; }

    private String id;
    private boolean isPublic;
    private String tag;
    private String title;
    private Timestamp date;
    private String writer;
    private int up;
}

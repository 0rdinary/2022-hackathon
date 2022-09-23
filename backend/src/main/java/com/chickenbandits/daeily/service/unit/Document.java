package com.chickenbandits.daeily.service.unit;

public class Document {
    public String getTitle() {
        return title;
    }
    public String getWriter() {
        return writer;
    }
    public String getPassword() {
        return password;
    }
    public String getTag() {
        return tag;
    }
    public String getContent() {
        return content;
    }
    public int getUp() {
        return up;
    }
    public int getDown() {
        return down;
    }
    public int getCommentNum() {
        return commentNum;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public void setWriter(String writer) {
        this.writer = writer;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setTag(String tag) {
        this.tag = tag;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public void setUp(int up) {
        this.up = up;
    }
    public void setDown(int down) {
        this.down = down;
    }
    public void setCommentNum(int commentNum) {
        this.commentNum = commentNum;
    }

    private String title;
    private String writer;
    private String password;
    private String tag;
    private String content;
    private int up;
    private int down;
    private int commentNum;
}

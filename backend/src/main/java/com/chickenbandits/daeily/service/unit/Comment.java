package com.chickenbandits.daeily.service.unit;

import com.google.cloud.Timestamp;

public class Comment {
    public String getContent() { return content; }
    public String getWriter() { return writer; }
    public Timestamp getDate() { return date; }

    public void setContent(String content) { this.content = content; }
    public void setWriter(String writer) { this.writer = writer; }
    public void setDate(Timestamp date) { this.date = date; }

    private String content;
    private String writer;
    private Timestamp date;
}

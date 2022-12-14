package com.chickenbandits.daeily.service;

import com.chickenbandits.daeily.domain.document.Comment;
import com.chickenbandits.daeily.domain.document.DocList;
import com.chickenbandits.daeily.domain.document.Document;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FirebaseService {

    public static final String COLLECTION_DOCUMENT = "document";
    public static final String COLLECTION_DOCLIST = "docList";
    public static final String COLLECTION_COMLIST = "comment";
    public static final String COLLECTION_TAGLIST = "list";

    public String insertDocument(HashMap<String, Object> param) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        Map<String, Object> docData = new HashMap<>();
        for (String key: param.keySet()) {
            docData.put(key, param.get(key));
        }
        docData.put("date", Timestamp.now());
        docData.put("up", 0);
        docData.put("down", 0);
        ApiFuture<DocumentReference> apiFuture = db.collection(COLLECTION_DOCUMENT).add(docData);

        DocList docList = new DocList();
        String id = apiFuture.get().getId();

        docList.setDate((Timestamp)docData.get("date"));
        docList.setId(id);
        docList.setIsPublic(true);
        docList.setTag(docData.get("tag").toString());
        docList.setUp(0);
        docList.setTitle(docData.get("title").toString());
        docList.setWriter(docData.get("writer").toString());

        apiFuture = db.collection(COLLECTION_DOCLIST).add(docList);

        return apiFuture.get().getId();
    }
    public String selectDocument(String id) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> apiFuture = db.collection(COLLECTION_DOCUMENT).document(id).get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        Document document = null;
        ObjectMapper objectMapper = new ObjectMapper();
        String ans = "{\"id\":\""+id+"\",\"content\":";
        if(documentSnapshot.exists()) {
            document = documentSnapshot.toObject(Document.class);
            ans += objectMapper.writeValueAsString(document) + "}";
            return ans;
        }
        else {
            return "{id : ERROR}";
        }
    }

    public String selectComment(String id) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection(COLLECTION_DOCUMENT).document(id).collection(COLLECTION_COMLIST).orderBy("date", Query.Direction.DESCENDING).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();

        ArrayList<Comment> commentList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        String ans = "{\"comment\":";
        for (DocumentSnapshot document : documents) {
            commentList.add(document.toObject(Comment.class));
        }
        ans += objectMapper.writeValueAsString(commentList) + "}";
        return ans;
    }

    public String selectDocumentsByTag(String tag) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection(COLLECTION_DOCLIST).whereEqualTo("isPublic", true).whereEqualTo("tag",tag).orderBy("date", Query.Direction.DESCENDING).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();

        List<DocList> docList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        String ans = "{\"list\":";
        for (DocumentSnapshot document : documents) {
            docList.add(document.toObject(DocList.class));
        }
        ans += objectMapper.writeValueAsString(docList) + "}";
        return ans;
    }

    public String vote(String id, String way) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> apiFuture = db.collection(COLLECTION_DOCUMENT).document(id).get();
        DocumentSnapshot documentSnapshot = apiFuture.get();
        DocumentReference docRef = db.collection(COLLECTION_DOCUMENT).document(id);

        int up = Integer.parseInt(documentSnapshot.get("up").toString());
        int down = Integer.parseInt(documentSnapshot.get("down").toString());
        String listID = "";
        if(way.equals("up")) {
            up++;
            ApiFuture<WriteResult> future = docRef.update("up", up);
            ApiFuture<QuerySnapshot> apiFuture2 = db.collection(COLLECTION_DOCLIST).whereEqualTo("id", id).get();
            List<QueryDocumentSnapshot> documents = apiFuture2.get().getDocuments();
            for (DocumentSnapshot document : documents) {
                listID = document.getId().toString();
            }
            docRef = db.collection(COLLECTION_DOCLIST).document(listID);
            future = docRef.update("up", up);
            WriteResult result = future.get();
            return result.toString();
        }
        else {
            down++;
            ApiFuture<WriteResult> future = docRef.update("down", down);
            WriteResult result = future.get();
            return result.toString();
        }
    }

    public Boolean editDocument(HashMap<String, Object> param) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> apiFuture = db.collection(COLLECTION_DOCUMENT).document(param.get("id").toString()).get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        Document document = documentSnapshot.toObject(Document.class);
        if(document.getPassword().equals(param.get("password").toString()))
        {
            DocumentReference docRef = db.collection(COLLECTION_DOCUMENT).document(param.get("id").toString());
            ApiFuture<WriteResult> future = docRef.update("content", param.get("content"));
            future.get();
            future = docRef.update("date",Timestamp.now());
            future.get();
            return true;
        }
        else
        {
            return false;
        }
    }
    public String selectDocumentsByWriter(String writer) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection(COLLECTION_DOCLIST).whereEqualTo("isPublic", true).whereEqualTo("writer",writer).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();

        List<DocList> docList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        String ans = "{\"list\":";
        for (DocumentSnapshot document : documents) {
            docList.add(document.toObject(DocList.class));
        }
        ans += objectMapper.writeValueAsString(docList) + "}";
        return ans;
    }

    public String selectTopDocuments() throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection(COLLECTION_DOCLIST).whereEqualTo("isPublic", true).orderBy("up", Query.Direction.DESCENDING).limit(5).get();
//        ApiFuture<QuerySnapshot> apiFuture = db.collection(COLLECTION_DOCLIST).orderBy("up", Query.Direction.DESCENDING).limit(5).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();

        List<DocList> docList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        String ans = "{\"list\":";
        for (DocumentSnapshot document : documents) {
            docList.add(document.toObject(DocList.class));
        }
        ans += objectMapper.writeValueAsString(docList) + "}";
        return ans;
    }

    public String insertComment(HashMap<String, Object> param) throws Exception{
        Firestore db = FirestoreClient.getFirestore();
        String docId = param.get("id").toString();
        Map<String, Object> comment = new HashMap<>();
        for (String key: param.keySet()) {
            if(key!="id")
            {
                comment.put(key, param.get(key));
            }
        }
        comment.put("date", Timestamp.now());
        ApiFuture<DocumentReference> apiFuture = db.collection(COLLECTION_DOCUMENT).document(docId).collection(COLLECTION_COMLIST).add(comment);

        return apiFuture.get().getId();
    }
}
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
            docData.put(key, docData.get(key));
        }
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
        ApiFuture<QuerySnapshot> apiFuture = db.collection(COLLECTION_DOCUMENT).document(id).collection(COLLECTION_COMLIST).get();
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

    public String selectDocuments(String tag) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection(COLLECTION_DOCLIST).whereEqualTo("isPublic", true).whereEqualTo("tag",tag).get();
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
}
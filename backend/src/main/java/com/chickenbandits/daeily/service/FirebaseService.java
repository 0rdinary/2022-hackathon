package com.chickenbandits.daeily;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class FirebaseService {

    public static final String COLLECTION_NAME = "document";

    public void insertUser() throws Exception {

        Firestore db = FirestoreClient.getFirestore();
        Map<String, Object> docData = new HashMap<>();
        docData.put("title", "test1");
        docData.put("writer", "admin");
        docData.put("password", "12345");
        docData.put("content", "안녕하세요 ㅎㅇㅎㅇㅎㅇ");
        docData.put("up", 2);
        docData.put("down", 15);
        ApiFuture<WriteResult> apiFuture = db.collection(COLLECTION_NAME).document("test").set(docData);
    }


    public String selectUser(String doc) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> apiFuture = db.collection(COLLECTION_NAME).document(doc).get();
        DocumentSnapshot documentSnapshot = apiFuture.get();
        if(documentSnapshot.exists()) {
            return documentSnapshot.getData().toString();
        }
        return "ERROR";
    }
}
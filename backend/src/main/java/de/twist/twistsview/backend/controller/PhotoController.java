package de.twist.twistsview.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.twist.twistsview.backend.services.PhotoStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/photos")
@RequiredArgsConstructor // automatically creates Constructor for Dependency Injection
public class PhotoController {

    private final PhotoStorageService storageService;

    @GetMapping("/allnames")
    public List<String> getAllPhotoNames() {
        return storageService.getImageListNames();
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getPhoto(@PathVariable String filename) {
        Resource file = storageService.getImageAsResource(filename);

        // if file not found or no given access-rights -> 404 Not Found
        if (file == null) {
            return ResponseEntity.notFound().build(); 
        }

        String contentType = "image/jpeg";
        if (filename.toLowerCase().endsWith(".png")) {
            contentType = "image/png";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(file);
    }

    @GetMapping("/test")
    public Map<String, String> testConnection() {
        // Wir geben direkt ein JSON-Objekt zurück, das versteht das React-Frontend später am besten
        return Map.of("status", "success", "message", "Hallo vom Spring Boot Backend! 🚀");
    }
    
}


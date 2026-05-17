package de.twist.twistsview.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class PhotoStorageService {

    @Value("${photo.storage-path}")
    private String storagePath;

    // get all image names from local directory
    // storge path placed in yaml
    public List<String> getImageListNames() {
        try {
            Path root = Paths.get(storagePath);
            if (!Files.exists(root)) {
                // Falls der Ordner nicht existiert, erstellen wir ihn einfach
                Files.createDirectories(root);
            }
            
            return Files.list(root)
                    .filter(Files::isRegularFile)
                    .map(path -> path.getFileName().toString())
                    // allowence for regular Image file formats
                    .filter(name -> name.toLowerCase().endsWith(".jpg") || 
                                    name.toLowerCase().endsWith(".jpeg") || 
                                    name.toLowerCase().endsWith(".png"))
                    .toList();
        } catch (IOException e) {
            System.err.println("Fehler beim Lesen des Bildverzeichnisses: " + e.getMessage());
            return java.util.Collections.emptyList(); // returns a save empty list []
        }
    }

    // loads a specific image as streamable Resource
    public Resource getImageAsResource(String filename) {
        try {
            Path root = Paths.get(storagePath).normalize().toAbsolutePath();
            Path file = root.resolve(filename).normalize().toAbsolutePath();

            // prevents "Directory Traversal" (directory break-out)
            if (!file.startsWith(root)) {
                return null;
            }

            Resource resource = new UrlResource(file.toUri());

            // check for image existence and readability
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                return null; // no error thrown just return null -> prevents system shutdown
            }
        } catch (MalformedURLException e) {
            System.err.println("Resource nicht gefunden; fehlerhafte Datei" + e.getMessage());
            return null; // no error thrown just return null -> prevents system shutdown
        }
    }
}

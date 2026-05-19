const BACKEND_URL = 'http://localhost:8080/api/photos';

/**
 * Holt die Liste aller Dateinamen vom Spring Boot Backend.
 */
export const fetchPhotoNames = async (): Promise<string[]> => {
  const response = await fetch(`${BACKEND_URL}/allnames`);

  if (!response.ok) {
    throw new Error(
      `Fehler beim Laden der Bilderliste: HTTP ${response.status}`,
    );
  }

  return await response.json();
};

/**
 * Baut aus einem Dateinamen die vollständige URL für das <img>-Tag zusammen.
 */
export const buildPhotoUrl = (fileName: string): string => {
  return `${BACKEND_URL}/${fileName}`;
};

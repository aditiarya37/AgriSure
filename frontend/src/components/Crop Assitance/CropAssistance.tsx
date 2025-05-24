import React, { useState, useRef, useCallback } from 'react';
// Assuming analyzeCropImage returns Promise<{ disease: string; confidence: string; treatment: string; }>
// or throws an error.
import { analyzeCropImage } from '../../utils/gemini';
import "./CropAssistance.css";

// Define the expected prediction structure clearly
interface Prediction {
  disease: string;
  confidence: string;
  treatment: string;
}

function CropAssistance() {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null); // Use the interface
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // processFile, handleImageUpload, handleButtonClick, drag/drop handlers remain the same...
  // Handle file validation and preview
  const processFile = (file: File) => {
    setError(null);
    setPrediction(null); // Clear previous prediction on new file

    if (!file.type.match(/^image\/(jpeg|png|gif|webp)$/)) { // Stricter type check
      setError('Please upload a valid image file (JPEG, PNG, WEBP, GIF).');
      setImage(null); // Clear image preview on invalid type
      return false;
    }

    if (file.size > 5 * 1024 * 1024) { // 5 MB limit
      setError('File size exceeds the 5MB limit.');
       setImage(null); // Clear image preview on size error
      return false;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      } else {
        setError('Could not read the image file.');
        setImage(null);
      }
    };
    reader.onerror = () => {
      setError('Error reading file.');
      setImage(null);
    };
    reader.readAsDataURL(file);
    return true;
  };

  // Handle manual file selection
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        processFile(file);
    }
    // Reset input value to allow re-uploading the same file
    if (e.target) {
        e.target.value = '';
    }
  };

   // Trigger file input click
  const handleButtonClick = () => {
    // Clear error/prediction when user intends to change image
    // setError(null); // Optional: Keep error until new image processed?
    // setPrediction(null); // Optional: Keep prediction until new one loads?
    fileInputRef.current?.click();
  };

   // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.relatedTarget && (e.currentTarget as Node).contains(e.relatedTarget as Node)) {
        return;
    }
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    } else {
        // Keep existing error or set a new one?
        if (!error) setError("Could not process the dropped file.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'copy';
  };


  // Analyze image with Gemini - CORRECTED LOGIC
  const handleAnalyze = useCallback(async () => {
    if (!image) {
      setError("No image selected to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPrediction(null); // Clear previous results before new analysis

    try {
      // Basic check for data URL format is still reasonable
      if (!image.startsWith('data:image/')) {
        throw new Error('Invalid image data format in component state.');
      }

      // --- Core Change ---
      // Directly await the result object. analyzeCropImage will handle
      // parsing and throw an error if it fails, which will be caught below.
      const analysisResult: Prediction = await analyzeCropImage(image);

      // Optional: You could add a sanity check here, though analyzeCropImage should guarantee the structure
      if (!analysisResult || typeof analysisResult.disease !== 'string' || typeof analysisResult.confidence !== 'string' || typeof analysisResult.treatment !== 'string') {
          console.error("Received unexpected object structure from analyzeCropImage:", analysisResult);
          throw new Error("Analysis function returned an improperly structured result.");
      }

      // If analyzeCropImage succeeded, set the prediction state directly
      setPrediction(analysisResult);
      // --- End Core Change ---

    } catch (err) {
      // This block now catches errors from analyzeCropImage (API errors, parsing errors, etc.)
      // and any errors thrown within this 'try' block itself.
      console.error('Analysis error caught in App.tsx:', err); // Log the actual error caught

      // Display the error message thrown by analyzeCropImage or a generic one
      if (err instanceof Error) {
        setError(err.message || 'An unknown analysis error occurred.'); // Use the specific message
      } else {
        setError('An unknown error occurred during analysis.');
      }
      // Ensure prediction is cleared if analysis fails
      setPrediction(null);

    } finally {
      setIsLoading(false);
    }
  }, [image]); // Dependency array is correct

  // Helper function to get confidence class (remains the same)
  const getConfidenceClass = (confidence: string): string => {
    const lowerConfidence = confidence?.toLowerCase() || 'unknown';
    if (lowerConfidence === 'high') return 'confidence-high';
    if (lowerConfidence === 'medium') return 'confidence-medium';
    if (lowerConfidence === 'low') return 'confidence-low';
    return 'confidence-unknown';
  };


  // --- JSX Structure (remains largely the same) ---
  return (
    <div className="ca-container">

        <h1><span className="emoji">🌿</span> AgriSure</h1>
        <p className="subheading">Upload a crop image to detect diseases and get treatment advice.</p>

        <input
            type="file"
            accept="image/jpeg, image/png, image/webp, image/gif"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="file-input"
            aria-label="Upload crop image"
        />

        <div
            className={`drop-zone ${isDragging ? 'dragging' : ''} ${image ? 'has-image' : ''}`}
            onClick={!image ? handleButtonClick : undefined}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (!image && (e.key === 'Enter' || e.key === ' ')) handleButtonClick(); }}
            aria-label={image ? "Image preview area, click button below to change" : "Drag and drop image upload area"}
        >
             {image ? (
                <>
                    <img src={image} alt="Crop preview" />
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '40px', width: '40px', marginBottom: '10px', opacity: '0.6' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V12" />
                    </svg>
                    <p>{isDragging ? 'Drop your image here!' : 'Drag & drop image here'}</p>
                    <p className="drop-zone-text-secondary">or</p>
                    <button
                        type="button"
                        className="browse-button"
                        onClick={(e) => { e.stopPropagation(); handleButtonClick(); }}
                    >
                        Browse Files
                    </button>
                    <p className="drop-zone-text-secondary" style={{ marginTop: '15px' }}>Max 5MB (JPG, PNG, WEBP, GIF)</p>
                </>
            )}
        </div>

        {/* Button to change image */}
        {image && !isLoading && (
            <div className="button-container" style={{marginTop: '0px', marginBottom: '20px'}}>
                 <button type="button" onClick={handleButtonClick}>
                    <span className="emoji">🔄</span> Change Image
                 </button>
            </div>
        )}

        {/* Error message */}
        {error && (
            <p role="alert" aria-live="assertive" className="error-message">
                {error}
            </p>
        )}

        {/* Analyze button */}
        {image && (
            <div className="button-container">
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading || !image}
                >
                    {isLoading ? (
                        <>
                            <svg className="loading-spinner" style={{height: '20px', width: '20px', animation: 'spin 1s linear infinite'}} // Added animation style
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle style={{opacity: '0.25'}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path style={{opacity: '0.75'}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </>
                    ) : (
                        <>
                          <span className="emoji">✨</span> Analyze Crop
                        </>
                    )}
                </button>
            </div>
        )}

        {/* Prediction result */}
        {prediction && !isLoading && (
            <div aria-live="polite" className="prediction-result">
                <h3>Diagnosis Result</h3>
                <div className="prediction-item">
                    <h4>Detected Disease</h4>
                    <p>{prediction.disease}</p>
                </div>
                <div className="prediction-item">
                    <h4>Confidence Level</h4>
                    <span className={getConfidenceClass(prediction.confidence)}>
                        {prediction.confidence || 'Unknown'}
                    </span>
                </div>
                <div className="prediction-item">
                    <h4>Recommended Treatment / Notes</h4>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{prediction.treatment}</p>
                </div>
            </div>
        )}

        {/* Footer */}
        <div className="footer">
          <p>© {new Date().getFullYear()} AgriSure. AI analysis for informational purposes only.</p>
        </div>

        {/* Keyframes for spinner animation - add to App.css if not already there */}
        <style>
        {`
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `}
        </style>

    </div> // End app-container
  );
}

export default CropAssistance;
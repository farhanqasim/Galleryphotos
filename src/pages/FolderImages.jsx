import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFolders } from '../hooks/useFolders'
import { useImages } from '../hooks/useImages'
import ImageCard from '../components/ImageCard'
import UploadModal from '../components/UploadModal'

const FolderImages = () => {
  const { id } = useParams()
  const folderId = Number(id)
  const { items: folders, fetchFolders } = useFolders()
  const { items: images, loading, error, fetchImagesByFolder } = useImages()
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  useEffect(() => {
    fetchFolders()
    fetchImagesByFolder(folderId)
  }, [fetchFolders, fetchImagesByFolder, folderId])

  const currentFolder = useMemo(() => folders.find((folder) => folder.id === folderId), [folders, folderId])

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <Link to="/folders" className="back-link">
            ← Back to folders
          </Link>
          <h1>{currentFolder?.name || currentFolder?.title || `Folder ${folderId}`}</h1>
          <p>Beautiful gallery view of your uploaded images</p>
        </div>
        <button className="btn" onClick={() => setIsUploadOpen(true)}>
          Upload to Folder
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}
      {loading ? (
        <p>Loading images...</p>
      ) : images.length ? (
        <div className="image-grid">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      ) : (
        <div className="card">
          <p>No images in this folder yet.</p>
        </div>
      )}

      <UploadModal
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        folders={folders}
        defaultFolderId={folderId}
        onUploaded={() => fetchImagesByFolder(folderId)}
      />
    </section>
  )
}

export default FolderImages

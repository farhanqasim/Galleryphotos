import { useMemo, useState } from 'react'
import { useImages } from '../hooks/useImages'

const UploadModal = ({ open, onClose, folders, defaultFolderId, onUploaded }) => {
  const { uploadImage, uploading } = useImages()
  const [title, setTitle] = useState('')
  const [folderId, setFolderId] = useState(defaultFolderId || '')
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  const canSubmit = useMemo(() => title && folderId && file, [title, folderId, file])

  if (!open) return null

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!canSubmit) {
      setError('Please fill all fields.')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('folder_id', folderId)
    formData.append('image', file)

    const result = await uploadImage(formData)
    if (result.meta.requestStatus === 'rejected') {
      setError(result.payload || 'Upload failed')
      return
    }

    setTitle('')
    setFile(null)
    if (onUploaded) onUploaded(folderId)
    onClose()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Upload Image</h3>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Image title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <select
            className="input"
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
          >
            <option value="">Select folder</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name || folder.title || `Folder ${folder.id}`}
              </option>
            ))}
          </select>

          <input className="input" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0])} />

          {error && <p className="error-text">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn" disabled={!canSubmit || uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadModal

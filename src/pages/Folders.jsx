import { useEffect, useState } from 'react'
import { useFolders } from '../hooks/useFolders'
import FolderCard from '../components/FolderCard'
import UploadModal from '../components/UploadModal'

const Folders = () => {
  const { items: folders, loading, error, fetchFolders, createFolder } = useFolders()
  const [folderName, setFolderName] = useState('')
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  const handleCreateFolder = async (event) => {
    event.preventDefault()
    if (!folderName.trim()) return

    const result = await createFolder({ name: folderName })
    if (result.meta.requestStatus === 'fulfilled') {
      setFolderName('')
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Your Folders</h1>
          <p>Create folders and organize all your uploaded images.</p>
        </div>
        <button className="btn" onClick={() => setIsUploadOpen(true)}>
          Upload Image
        </button>
      </div>

      <form className="card folder-form" onSubmit={handleCreateFolder}>
        <h2>Create New Folder</h2>
        <div className="inline-form">
          <input
            className="input"
            placeholder="Folder name"
            value={folderName}
            onChange={(event) => setFolderName(event.target.value)}
          />
          <button className="btn" type="submit">
            Create
          </button>
        </div>
      </form>

      {error && <p className="error-text">{error}</p>}

      {loading ? (
        <p>Loading folders...</p>
      ) : (
        <div className="folder-grid">
          {folders.map((folder) => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>
      )}

      {!loading && folders.length === 0 && <p>No folders found yet.</p>}

      <UploadModal
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        folders={folders}
        onUploaded={() => fetchFolders()}
      />
    </section>
  )
}

export default Folders

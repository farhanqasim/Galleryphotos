import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useFolders } from '../hooks/useFolders'
import UploadModal from '../components/UploadModal'

const Dashboard = () => {
  const { items: folders, loading, fetchFolders } = useFolders()
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Gallery Dashboard</h1>
          <p>Manage folders and keep your visuals organized.</p>
        </div>
        <button className="btn" onClick={() => setIsUploadOpen(true)}>
          Upload Image
        </button>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <h3>{folders.length}</h3>
          <p>Total folders</p>
        </article>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Quick Folders</h2>
          <Link to="/folders" className="link-button">
            View all
          </Link>
        </div>
        {loading ? (
          <p>Loading folders...</p>
        ) : folders.length ? (
          <div className="folder-list-compact">
            {folders.slice(0, 6).map((folder) => (
              <Link className="folder-pill" key={folder.id} to={`/folders/${folder.id}`}>
                {folder.name || folder.title || `Folder ${folder.id}`}
              </Link>
            ))}
          </div>
        ) : (
          <p>No folders yet. Create one from the folders page.</p>
        )}
      </div>

      <UploadModal
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        folders={folders}
        onUploaded={() => fetchFolders()}
      />
    </section>
  )
}

export default Dashboard

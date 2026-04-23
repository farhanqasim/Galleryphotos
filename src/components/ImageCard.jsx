import { Link } from "react-router-dom"

const getImageSource = (image) => {
  const raw = image?.image_url || image?.url || image?.path || image?.image || ''
  if (!raw) return ''
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw

  const apiBase = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || ''
  const appBase = apiBase.replace('/api', '')

  return `${appBase}/${raw}`.replace(/([^:]\/)\/+/g, '$1')
}

const ImageCard = ({ image }) => {
  return (
    <article className="image-card">
      <img src={getImageSource(image)} alt={image.title || 'Gallery image'} className="gallery-image" width={100} height={100} />
      <div className="image-card-body">
        <h4 style={{ fontSize: '14px', fontWeight: 'bold' ,textTransform: 'capitalize'}}>{image.title || 'Untitled Image'}</h4>
      </div>
      <div className="image-card-footer " style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
        <Link to={getImageSource(image)} download className="btn">download</Link>
        <Link to={getImageSource(image)} className="btn" target="_blank">view</Link>
        </div>
    </article>
  )
}

export default ImageCard

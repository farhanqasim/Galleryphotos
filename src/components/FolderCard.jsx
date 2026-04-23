import { Link } from 'react-router-dom'

const FolderCard = ({ folder }) => {
  return (
    <Link to={`/folders/${folder.id}`} className="folder-card">
      <div className="folder-icon"><img src={'https://www.thefinalstep.co.uk/hs-fs/hubfs/Screenshot%202022-05-04%20at%2015.04.03.png?width=1479&name=Screenshot%202022-05-04%20at%2015.04.03.png'} alt="folder icon" width={150} height={100} /></div>
      <h3 style={{ fontSize: '14px', fontWeight: 'bold' ,textTransform: 'capitalize'}}>{folder.name || folder.title || `Folder ${folder.id}`}</h3>
      {/* <p>Open folder images</p> */}
    </Link>
  )
}

export default FolderCard

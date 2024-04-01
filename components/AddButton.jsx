import styles from '../styles/Add.module.css'

const AddButton = ({ setClose, admin }) => {
  console.log(admin)
  if (admin) {
    return (
      <div onClick={() => setClose(false)} className={styles.mainAddButton}>
        Add New Pizza
      </div>
    )
  } else {
    return <></>
  }
}

export default AddButton

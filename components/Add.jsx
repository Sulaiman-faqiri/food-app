import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../util/firebaseConfig'
import styles from '../styles/Add.module.css'

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null)

  const [desc, setDesc] = useState(null)
  const [title, setTitle] = useState(null)

  const [prices, setPrices] = useState([])
  const [extraOptions, setExtraOptions] = useState([])
  const [extra, setExtra] = useState(null)
  const router = useRouter()

  const changePrice = (e, index) => {
    const currentPrices = [...prices]
    currentPrices[index] = e.target.value
    setPrices(currentPrices)
  }

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value })
  }

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra])
  }

  const handleCreate = async () => {
    try {
      if (!file || !title || !desc || !prices.length || !extraOptions.length) {
        // Check if any of the required fields are empty
        alert('Please fill in all the fields')
        return
      }
      // Reference to the storage location where the file will be uploaded
      const storageRef = ref(storage, `images/${file.name}`)

      // Upload the file
      const uploadTask = uploadBytesResumable(storageRef, file)

      // Register observers for success and error
      uploadTask.on(
        'state_changed',
        null, // No need for progress handler
        (error) => {
          // Handle unsuccessful uploads
          console.error(error)
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              // Once the file is uploaded, get its download URL and proceed with creating the new product
              const newProduct = {
                title,
                desc,
                prices,
                extraOptions,
                img: downloadURL, // Use the download URL as the image URL in your product data
              }
              console.log(newProduct)
              await axios.post('api/products', newProduct)
              setClose(true) // Close the modal after successful upload and product creation
              router.push('/') // Redirect to the home page
              console.log('File uploaded successfully:', downloadURL)
            })
            .catch((error) => {
              console.error('Error getting download URL:', error)
            })
        }
      )
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input type='text' onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type='text'
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              placeholder='Small'
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              placeholder='Medium'
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              placeholder='Large'
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='text'
              placeholder='Item'
              name='text'
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              placeholder='Price'
              name='price'
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  )
}

export default Add

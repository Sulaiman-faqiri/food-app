import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity)
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src='/img/telephone.png' alt='' width='32' height='32' />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href='/' passHref>
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <Link href='#pizzaList' passHref>
            <li className={styles.listItem}>Menu</li>
          </Link>

          <li>
            <Image
              className='img'
              src='/img/logo.png'
              alt=''
              width='120%'
              height='120%'
            />
          </li>
          <Link href='/admin' passHref>
            <li className={styles.listItem}>About</li>
          </Link>
          <Link href='/admin' passHref>
            <li className={styles.listItem}>Admin</li>
          </Link>
        </ul>
      </div>
      <Link href='/cart' passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src='/img/cart.png' alt='' width='30px' height='30px' />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Navbar

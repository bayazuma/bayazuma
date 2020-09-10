import styles from './about.module.scss'

export default function About({ about }) {
  // console.log(about)
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.photo}>
          <img src={about.photo.url} alt="" />
        </div>
        <div className={styles.name}>
          {about.name}
        </div>
        <div className={styles.text}>
          {about.outline}
        </div>
      </section>
      {
        // <div className={styles.heading}>
        //   Awards
        // </div>
        // <ul className={styles.list}>
        //   {about.awards.map(text =><li>{text.text}</li>)}
        // </ul>
      }
      <section className={styles.section}>
        <div className={styles.heading}>
          Capabilities
        </div>
        <ul className={styles.capa}>
          {about.capabilities.map(capa =><li key={capa.text}>{capa.text}</li>)}
        </ul>
      </section>
      <section className={styles.section}>
        <div className={styles.heading}>
          Say Hello
        </div>
        <ul className={styles.contact}>
          {about.contact.map(item =><li key={item.fieldId}><a href={item.url}>{item.name}</a></li>)}
        </ul>
      </section>
    </div>
  )
}

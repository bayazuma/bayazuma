import styles from './work.module.scss'

export default function Work({ work }) {
  // console.log(work);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{work.title}</h1>
      <p className={styles.link}>
        <a href={work.website} target="_blank">Visit Website</a>
      </p>
      <section>
        {
          work.body.map((item: { fieldId: string, editor: string }, idx: number) => {
            // console.log(item)
          //   if (item.fieldId === 'editor') {
          //     return <div key={idx} dangerouslySetInnerHTML={ {__html: item.editor} } className={styles.section}/>
          //   } else if (item.fieldId === 'html') {
          //     return <div key={idx} dangerouslySetInnerHTML={ {__html: item.html} } className={styles.section}/>
          //   }
            return (
              <div key={`${item.fieldId}${idx}`} dangerouslySetInnerHTML={ {__html: item.editor} } className={styles.section}/>
            )
          })
        }
      </section>
    </div>
  )
}

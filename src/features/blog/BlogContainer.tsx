export default function BlogContainer(props: {
  children: JSX.Element
}) {
  return (
    <div className="content blog">
      <header>
        <h1>Blog</h1>
      </header>
      {props.children}
    </div>
  )
}

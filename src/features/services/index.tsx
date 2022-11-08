import Contact from '../../components/Contact'
import useGetContent from '../../hooks/useGetContent'

import './Services.css';

interface PageInterface {
  content: {
    rendered: string
  }
}

function Wrapper(props: {
  fetched: PageInterface
}) {

  return (
    <div className="content">
      <div
        className="editorial"
        dangerouslySetInnerHTML={{
          __html: props.fetched.content.rendered
        }}
      />
      <div className="big-row">
        <div>
          <h1>Intéressé ?</h1>
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return useGetContent(Wrapper, '/wp/v2/pages/5')
}

import '../../Form.css';

export default function Contact() {
  return (
    <form>
      <div className="form-row">
        <input type="email" placeholder="Votre email" />
      </div>
      <div className="form-row">
        <textarea
          placeholder="Donnez moi une idée de l’aide dont vous avez besoin"
          rows={4}
          cols={45}
        />
      </div>
      <div className="form-row">
        <button type="submit" className="CTA">Contactez-moi</button>
      </div>
    </form>
  )
}

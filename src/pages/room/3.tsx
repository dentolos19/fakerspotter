export default function Page() {
  return (
    <div className={"card"}>
      <div className={"card-header"}>
        This is a preview. This is not the actual product.
      </div>
      <div className={"card-body"}>
        <h5>Title</h5>
        <p>Image</p>
        <p>Background</p>
        <div className={"btn-group"}>
          <button className={"btn btn-success"}>Real</button>
          <button className={"btn btn-danger"}>Fake</button>
        </div>
      </div>
    </div>
  );
}
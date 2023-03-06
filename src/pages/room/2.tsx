export default function Page() {
  return (
    <div className={"card"}>
      <div className={"card-header"}>
        This is a preview. This is not the actual product.
      </div>
      <div className={"card-body"}>
        <h5>Headline</h5>
        <div className={"btn-group"}>
          <button className={"btn btn-success"}>True</button>
          <button className={"btn btn-danger"}>False</button>
        </div>
      </div>
    </div>
  );
}
export default function Page() {
  return (
    <div className={"card"}>
      <div className={"card-header"}>
        This is a preview. This is not the actual product.
      </div>
      <div className={"card-body"}>
        <h5>Statement</h5>
        <div className={"btn-group"}>
          <button className={"btn btn-primary"}>Fact</button>
          <button className={"btn btn-secondary"}>Opinion</button>
        </div>
      </div>
    </div>
  );
}
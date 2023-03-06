export default function Page() {
  return (
    <div className={"card"}>
      <div className={"card-header"}>Hello</div>
      <div className={"card-body"}>
        <h5>Title</h5>
        <div className={"btn-group"}>
          <button className={"btn btn-success"}>True</button>
          <button className={"btn btn-danger"}>False</button>
        </div>
      </div>
    </div>
  );
}
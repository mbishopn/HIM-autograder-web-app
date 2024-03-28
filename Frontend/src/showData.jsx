import "./App.css";

export default function ShowData({ data }) {
  if (data[0])
    return (
      <table>
        <tbody>
          {Object.values(data).map((x, i) => {
            //console.log(x)
            return (
              <tr key={i}>
                {Object.values(x).map((v, i) => {
                  return (
                    <td width="300" key={i}>
                      {v}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}

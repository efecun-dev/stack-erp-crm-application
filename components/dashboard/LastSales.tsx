const data = [
  { client: "Akın Ticaret", amount: 12400, status: "shipped" },
  { client: "Mavi İnşaat", amount: 8750, status: "delivered" },
  { client: "Yıldız Elektronik", amount: 21200, status: "preparing" },
  { client: "Deniz Lojistik", amount: 5300, status: "shipped" },
];

export default function LastSales() {
  return (
    <>
      <tbody>
        {data.map((item) => (
          <tr>
            <td>{item.client}</td>
            <td>{item.amount}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
}

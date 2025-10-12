// export async function POST(req) {
//   const body = await req.json();
//   const { id, limit = 10, offset = 0, sort = "newest" } = body;

//   const response = await fetch(`https://ecoverse.namtech.me/api/tmdt/products/${id}/reviews`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       jsonrpc: "2.0",
//       method: "call",
//       params: { limit, offset, sort },
//       id: null
//     })
//   });

//   const data = await response.json();
//   return Response.json(data);
// }

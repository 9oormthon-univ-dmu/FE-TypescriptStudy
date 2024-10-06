export default function handler(request, response) {
    if (request.method == 'GET'){
      response.status(200).json({ name: '안녕' })
    }
    if (request.method == 'POST'){
      response.status(200).json({ name: '바보' })
    }
  }
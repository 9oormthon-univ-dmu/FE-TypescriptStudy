export default function handler(요청, 응답) {
    if (요청.method == 'GET'){
      응답.status(200).json({ name: '안녕' })
    }
    if (요청.method == 'POST'){
      응답.status(200).json({ name: '바보' })
    }
  }
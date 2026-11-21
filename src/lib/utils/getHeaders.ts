export function getHeaders (getHeader: (hear: string)=> string| null){

    
      const userAgent = getHeader("user-agent");
      const rawXff = getHeader("x-forwarded-for");
      const rawRealIp = getHeader("x-real-ip");
      const ipAddress = rawXff ? rawXff.split(",")[0].trim() : rawRealIp;

      return { userAgent, ipAddress }
}

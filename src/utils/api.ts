// 获取API基础URL的函数
function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL || 'https://yuzhicha.com';
}

export async function checkRisk(input: string | string[]) {
  try {
    const apiUrl = `${getApiBaseUrl()}/api/match-keywords`;
    console.debug('Making API request to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titles: Array.isArray(input) ? input : [input]
      }),
    })

    if (!response.ok) {
      throw new Error('API请求失败')
    }

    return await response.json()
  } catch (error) {
    console.error('检查风险失败:', error)
    throw error
  }
}

export async function getRiskDetail(id: string) {
  try {
    const apiUrl = `${getApiBaseUrl()}/risk/${id}`;
    console.debug('Making API request to:', apiUrl);
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`获取风险详情失败: ${response.status}`);
    }

    const data = await response.json();
    console.debug('API response:', data);
    return data;
  } catch (error) {
    console.error('获取风险详情失败:', error);
    return {
      success: true,
      data: null
    };
  }
}

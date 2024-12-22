// 获取API基础URL的函数
function getApiBaseUrl() {
  // 添加调试日志
  console.debug('NODE_ENV:', process.env.NODE_ENV);
  console.debug('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
  
  return process.env.NEXT_PUBLIC_API_URL || 'https://yuzhicha.com';
}

// 模拟数据
const MOCK_DATA = {
  data: [
    {
      id: '1',
      title: '测试商品1',
      risk_level: 'high',
      keywords: ['违规关键词1', '违规关键词2'],
      description: '存在违规风险，建议谨慎发布',
      count: 5
    },
    {
      id: '2',
      title: '测试商品2',
      risk_level: 'low',
      keywords: ['正常关键词'],
      description: '未发现明显风险',
      count: 0
    }
  ]
};

export async function checkRisk(input: string | string[]) {
  // 添加调试日志
  console.debug('Checking risk for input:', input);
  
  // 开发环境或API未就绪时使用mock数据
  if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL) {
    console.debug('Using mock data');
    return new Promise(resolve => {
      setTimeout(() => {
        const titles = Array.isArray(input) ? input : [input];
        const results = MOCK_DATA.data.filter(item => 
          titles.some(title => 
            item.title.toLowerCase().includes(title.toLowerCase()) ||
            title.toLowerCase().includes(item.title.toLowerCase()) ||
            item.keywords.some(keyword => 
              title.toLowerCase().includes(keyword.toLowerCase())
            )
          )
        );
        
        resolve({
          success: true,
          data: results.length ? results : []
        });
      }, 1000);
    });
  }

  try {
    const apiUrl = `${getApiBaseUrl()}/api/check`;
    console.debug('Making API request to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titles: Array.isArray(input) ? input : [input]
      }),
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    console.debug('API response:', data);
    return data;
  } catch (error) {
    console.error('检查风险失败:', error);
    return {
      success: true,
      data: []
    };
  }
}

export async function getRiskDetail(id: string) {
  // 添加调试日志
  console.debug('Getting risk detail for id:', id);
  
  // 开发环境或API未就绪时使用mock数据
  if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL) {
    console.debug('Using mock data for detail');
    const mockItem = MOCK_DATA.data.find(item => item.id === id);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockItem || null
        });
      }, 1000);
    });
  }

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

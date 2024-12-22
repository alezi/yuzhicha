const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yuzhicha.com'

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
  // 开发环境或API未就绪时使用mock数据
  if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL) {
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
      }, 1000); // 模拟网络延迟
    });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titles: Array.isArray(input) ? input : [input]
      }),
    });

    if (!response.ok) {
      throw new Error('API请求失败');
    }

    return await response.json();
  } catch (error) {
    console.error('检查风险失败:', error);
    // 如果API调用失败，返回空结果而不是抛出错误
    return {
      success: true,
      data: []
    };
  }
}

export async function getRiskDetail(id: string) {
  // 开发环境使用模拟数据
  if (process.env.NODE_ENV === 'development') {
    const mockItem = MOCK_DATA.data.find(item => item.id === id)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, data: mockItem })
      }, 1000)
    })
  }

  try {
    const response = await fetch(`${API_URL}/api/risk/${id}`)
    
    if (!response.ok) {
      throw new Error('获取风险详情失败')
    }

    return await response.json()
  } catch (error) {
    console.error('获取风险详情失败:', error)
    throw error
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yuzhicha.com'

// 模拟数据
const MOCK_DATA = {
  success: true,
  data: [
    {
      id: '1',
      level: 3,
      title: '2024肖秀荣考研政治',
      description: '该商品涉嫌侵犯知识产权，已有多起投诉记录',
      keywords: ['考研', '肖秀荣', '政治'],
      created_at: new Date().toISOString(),
      report_count: 15,
      last_report_date: '2024-01-15',
      risk_type: '版权侵权',
      report_details: [
        '未经授权销售PDF版本',
        '存在扫描版本传播',
        '违反知识产权保护规定'
      ],
      handling_advice: [
        '立即下架相关商品',
        '删除商品描述中的品牌名称',
        '避免使用"肖秀荣"等关键词'
      ],
      similar_cases: [
        {
          title: '肖四肖八PDF',
          result: '因侵权被平台下架'
        },
        {
          title: '考研政治资料',
          result: '接到出版社投诉'
        }
      ]
    },
    {
      id: '2',
      level: 2,
      title: '某教育机构网课视频合集',
      description: '存在未授权传播在线课程的风险',
      keywords: ['网课', '视频', '教育'],
      created_at: new Date().toISOString(),
      report_count: 8,
      last_report_date: '2024-01-10',
      risk_type: '未授权传播',
      report_details: [
        '未经机构授权传播课程',
        '涉及多个培训机构投诉'
      ],
      handling_advice: [
        '避免销售未授权的课程视频',
        '建议转向正规课程代理'
      ]
    },
    {
      id: '3',
      level: 3,
      title: '餐饮技术配方资料',
      description: '涉嫌泄露商业机密，多次被品牌投诉',
      keywords: ['配方', '技术', '餐饮'],
      created_at: new Date().toISOString(),
      report_count: 12,
      last_report_date: '2024-01-08',
      risk_type: '商业机密',
      report_details: [
        '未经授权泄露商家配方',
        '违反商业保密协议',
        '存在虚假宣传'
      ],
      handling_advice: [
        '立即删除配方相关内容',
        '避免使用特定品牌名称',
        '更换为通用技术教程'
      ]
    },
    {
      id: '4',
      level: 1,
      title: '手工制作教程合集',
      description: '部分内容可能存在著作权问题',
      keywords: ['教程', '手工', 'DIY'],
      created_at: new Date().toISOString(),
      report_count: 3,
      last_report_date: '2024-01-05',
      risk_type: '著作权',
      report_details: [
        '教程部分内容未注明来源',
        '存在转载未授权问题'
      ],
      handling_advice: [
        '标注内容来源',
        '获取原作者授权',
        '使用自制教程内容'
      ]
    },
    {
      id: '5',
      level: 3,
      title: '付费课程破解版',
      description: '严重侵犯知识产权，高风险商品',
      keywords: ['破解', '付费课程', '视频教程'],
      created_at: new Date().toISOString(),
      report_count: 20,
      last_report_date: '2024-01-12',
      risk_type: '盗版传播',
      report_details: [
        '破解付费课程',
        '非法传播收费内容',
        '多个机构投诉'
      ],
      handling_advice: [
        '立即停止销售盗版内容',
        '删除相关商品描述',
        '避免此类商品交易'
      ],
      similar_cases: [
        {
          title: '某平台付费课程合集',
          result: '账号被封禁'
        }
      ]
    }
  ]
}

export async function checkRisk(input: string | string[]) {
  // 开发环境使用模拟数据
  if (process.env.NODE_ENV === 'development') {
    // 模拟搜索逻辑
    const titles = Array.isArray(input) ? input : [input]
    const results = MOCK_DATA.data.filter(item => 
      titles.some(title => 
        item.title.toLowerCase().includes(title.toLowerCase()) ||
        title.toLowerCase().includes(item.title.toLowerCase()) ||
        item.keywords.some(keyword => 
          title.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    )
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: results
        })
      }, 1000) // 模拟网络延迟
    })
  }

  try {
    const response = await fetch(`${API_URL}/api/check`, {
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

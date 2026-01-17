interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  type?: '팀' | '개인'
}

const projectsData: Project[] = [
  {
    title: 'WHYNE',
    description:
      '사용자가 다양한 와인 리뷰를 확인하고, 구매 여부를 쉽게 판단할 수 있는 와인 리뷰 플랫폼',
    imgSrc: '/static/images/whyne-banner.png',
    href: 'https://github.com/junye0l/WHYNE',
    type: '팀',
  },
  {
    title: 'Coworkers',
    description:
      '여러 명이 하나의 그룹을 만들어 할 일을 함께 공유하고 관리할 수 있는 협업용 To-do 플랫폼',
    imgSrc: '/static/images/coworkers-banner.png',
    href: 'https://github.com/junye0l/coworkers',
    type: '팀',
  },
  {
    title: 'yamoyo',
    description: '팀 프로젝트 시작에 필요한 모든 결정을 재밌고 빠르게 끝내는 팀 초기 세팅 서비스',
    imgSrc: '/static/images/coming-soon.png',
    href: 'https://github.com/yamoyo/yamoyo_FE',
    type: '팀',
  },
]

export default projectsData

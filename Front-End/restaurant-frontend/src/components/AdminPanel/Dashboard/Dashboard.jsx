import { useEffect, useState } from 'react'
import axiosConfig from '../../../api/axiosConfig'
import {
  Users,
  UtensilsCrossed,
  CalendarDays,
  CalendarCheck
} from 'lucide-react'
import Loading from '../../Loading/Loading'
import '../../Loading/Loading.css'

const Dashboard = () => {
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    menu: 0,
    bookings: 0,
    todayBookings: 0
  })

  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)

        const [usersRes, menuRes, bookingsRes] = await Promise.all([
          axiosConfig.get('/users'),
          axiosConfig.get('/menu-items'),
          axiosConfig.get('/bookings')
        ])

        const today = new Date().toISOString().split('T')[0]
        const todayBookings = bookingsRes.data.filter(
          b => b.booking_date === today
        ).length

        const newStats = {
          users: usersRes.data.length,
          menu: menuRes.data.length,
          bookings: bookingsRes.data.length,
          todayBookings
        }

        const duration = 1000
        const steps = 50
        const intervalTime = duration / steps
        let stepCount = 0

        const animInterval = setInterval(() => {
          stepCount++
          const progress = stepCount / steps

          setAnimatedStats({
            users: Math.floor(newStats.users * progress),
            menu: Math.floor(newStats.menu * progress),
            bookings: Math.floor(newStats.bookings * progress),
            todayBookings: Math.floor(newStats.todayBookings * progress)
          })

          if (stepCount >= steps) clearInterval(animInterval)
        }, intervalTime)

        setLoaded(true)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching dashboard stats:', err)
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const cards = [
    {
      title: 'Users',
      value: animatedStats.users,
      icon: <Users size={28} className='text-indigo-600' />
    },
    {
      title: 'Menu Items',
      value: animatedStats.menu,
      icon: <UtensilsCrossed size={28} className='text-[#D4AF37]' />
    },
    {
      title: 'Bookings',
      value: animatedStats.bookings,
      icon: <CalendarDays size={28} className='text-yellow-600' />
    },
    {
      title: "Today's Bookings",
      value: animatedStats.todayBookings,
      icon: <CalendarCheck size={28} className='text-red-600' />
    }
  ]

  return (
    <div className='min-h-screen p-4 sm:p-6 lg:p-8'>
      {loading && <Loading variant='fire' text='Loading Dashboard...' />}
      <h2 className='mb-6 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800'>
        Admin Dashboard
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={`flex items-center gap-3 sm:gap-4 rounded-xl bg-white p-4 sm:p-5 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className='rounded-full bg-gray-100 p-3 sm:p-4 shrink-0'>
              {card.icon}
            </div>
            <div className='min-w-0'>
              <p className='text-xs sm:text-sm text-gray-500'>{card.title}</p>
              <p className='text-lg sm:text-xl lg:text-2xl font-bold text-[#22185D]'>
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard

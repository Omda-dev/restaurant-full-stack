import { useEffect, useState } from 'react'
import { useAuth } from '../Auth/useAuth'
import axiosConfig from '../../api/axiosConfig'
import logo404 from '../../assets/logo404.png'
import Loading from '../Loading/Loading'
import '../Loading/Loading.css'
import './Profile.css'

const DEFAULT_AVATAR = logo404

const statusStyles = {
  pending: 'bg-[#D4AF37] text-[#111827]',
  accepted: 'bg-green-800 text-[#F9FAFB]',
  in_progress: 'bg-blue-800 text-[#F9FAFB]',
  delivered: 'bg-emerald-700 text-[#F9FAFB]',
  rejected: 'bg-[#8B0000] text-[#F9FAFB]'
}

const Profile = () => {
  const { user, updateUser, logout } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    password_confirmation: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [orders, setOrders] = useState([])
  const [bookings, setBookings] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [bookingsLoading, setBookingsLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        password: '',
        password_confirmation: ''
      })
      setImageFile(null)
      setRemoveCurrentImage(false)
    }
  }, [user])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrdersLoading(true)
        const res = await axiosConfig.get('/orders')
        setOrders(res.data)
      } catch (err) {
        console.error('Orders fetch error:', err.response?.data || err.message)
      } finally {
        setOrdersLoading(false)
      }
    }

    const fetchBookings = async () => {
      try {
        setBookingsLoading(true)
        const res = await axiosConfig.get('/bookings')
        setBookings(res.data)
      } catch (err) {
        console.error(
          'Bookings fetch error:',
          err.response?.data || err.message
        )
      } finally {
        setBookingsLoading(false)
      }
    }

    if (user) {
      fetchOrders()
      fetchBookings()
    }
  }, [user])

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImageChange = e => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setRemoveCurrentImage(false)
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setRemoveCurrentImage(true)
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      const data = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value)
      })
      if (imageFile) data.append('image', imageFile)
      if (removeCurrentImage) data.append('remove_image', '1')
      data.append('_method', 'PUT')

      const res = await axiosConfig.post(`/users/${user.id}`, data)
      const updatedUser = res.data.user

      setFormData({
        name: updatedUser.name || '',
        email: updatedUser.email || '',
        phone: updatedUser.phone || '',
        address: updatedUser.address || '',
        password: '',
        password_confirmation: ''
      })

      setImageFile(null)
      setRemoveCurrentImage(false)
      updateUser({ ...updatedUser })

      alert(res.data.message || 'Profile updated successfully')
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message)
      alert('Failed to update profile. Check console for details')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className='min-h-screen bg-[#111827] px-4 py-24 text-[#F9FAFB]'>
      <div className='mx-auto max-w-6xl space-y-8'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl font-bold text-[#F9FAFB]'>My Profile</h1>
          <p className='text-[#9CA3AF]'>
            Update your account details and review your latest orders and
            bookings.
          </p>
        </div>

        <div className='rounded-2xl border border-[#D4AF37] bg-[#111827] p-6 shadow-2xl shadow-black/20'>
          <div className='profile-header'>
            <div className='avatar-wrap'>
              <label htmlFor='profilePhoto' className='avatar-label'>
                <img
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : removeCurrentImage
                      ? DEFAULT_AVATAR
                      : user?.image || DEFAULT_AVATAR
                  }
                  alt={formData.name || 'Profile'}
                  className='profile-img-large'
                />
              </label>
              <input
                id='profilePhoto'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              {(imageFile || user?.image) && !removeCurrentImage && (
                <button
                  type='button'
                  className='btn danger-ghost'
                  onClick={handleRemoveImage}
                >
                  Remove
                </button>
              )}
            </div>

            <div className='profile-info'>
              <h2 className='profile-name'>{user?.name || 'Your Name'}</h2>
              <p className='profile-email'>
                {user?.email || 'email@example.com'}
              </p>
              <p className='profile-phone'>{user?.phone || 'No phone added'}</p>
              <p className='profile-address'>
                {user?.address || 'No address added'}
              </p>
            </div>
          </div>

          <div className='profile-form'>
            {['name', 'email', 'phone', 'address'].map(field => (
              <div className='form-field' key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field}
                />
              </div>
            ))}
            <div className='form-field full'>
              <label>Password</label>
              <div className='password-wrap'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Password'
                />
                <button
                  type='button'
                  className='toggle-pass'
                  onClick={() => setShowPassword(s => !s)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className='form-field full'>
              <label>Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password_confirmation'
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder='Confirm Password'
              />
            </div>
          </div>

          <div className='button-row'>
            <button className='btn primary' onClick={handleSave}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button className='btn danger' onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className='grid gap-8 lg:grid-cols-2'>
          <section className='relative rounded-2xl border border-[#D4AF37] bg-[#111827] p-6 shadow-2xl shadow-black/20 overflow-hidden'>
            <div className='mb-6 flex items-center justify-between gap-3'>
              <h2 className='text-2xl font-bold text-[#D4AF37]'>My Orders</h2>
              <span className='rounded-full bg-[rgba(212,175,55,0.14)] px-4 py-2 text-xs font-semibold text-[#F9FAFB]'>
                {orders.length} order{orders.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className='min-h-[300px]'>
              {ordersLoading ? (
                <div className='absolute inset-0 flex items-center justify-center bg-[rgba(17,24,39,0.85)] backdrop-blur-sm z-10'>
                  <Loading variant='fire' text='Loading Orders' />
                </div>
              ) : !orders.length ? (
                <div className='flex h-[300px] items-center justify-center'>
                  <div className='rounded-xl border border-dashed border-[#D4AF37] p-5 text-sm text-[#9CA3AF]'>
                    No orders yet. Place an order from the Order Online page to
                    see it here.
                  </div>
                </div>
              ) : (
                <div className='space-y-4'>
                  {orders.map(order => (
                    <div
                      key={order.id}
                      className='rounded-xl border border-[#D4AF37] bg-[rgba(17,24,39,0.82)] p-4'
                    >
                      <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
                        <div>
                          <p className='text-lg font-bold text-[#F9FAFB]'>
                            Order #{order.id}
                          </p>
                          <p className='text-sm text-[#9CA3AF]'>
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>

                        <div className='flex items-center gap-3'>
                          <span
                            className={`rounded-full px-4 py-2 text-xs font-semibold ${
                              statusStyles[order.status] ||
                              'bg-[#1F2937] text-[#F9FAFB]'
                            }`}
                          >
                            {order.status.replace('_', ' ')}
                          </span>

                          <span className='text-lg font-bold text-[#D4AF37]'>
                            ${Number(order.total_price).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className='space-y-3'>
                        {order.order_items?.map(item => (
                          <div
                            key={item.id}
                            className='flex items-center gap-3 rounded-lg border border-[#D4AF37] px-3 py-3'
                          >
                            {/* IMAGE */}
                            <img
                              src={item.menu_item?.image || logo404}
                              alt={item.menu_item?.name}
                              className='h-14 w-14 rounded-lg object-cover border border-[#D4AF37]'
                            />

                            {/* DETAILS */}
                            <div className='flex-1 min-w-0'>
                              <p className='font-semibold text-[#F9FAFB] truncate'>
                                {item.menu_item?.name || 'Menu Item'}
                              </p>

                              <p className='text-xs text-[#9CA3AF]'>
                                Qty: {item.quantity} • Price: ${item.price}
                              </p>

                              <p className='text-xs text-[#9CA3AF]'>
                                Date:{' '}
                                {new Date(order.created_at).toLocaleString()}
                              </p>
                            </div>

                            {/* TOTAL */}
                            <div className='text-right'>
                              <p className='font-bold text-[#D4AF37]'>
                                $
                                {(Number(item.price) * item.quantity).toFixed(
                                  2
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className='relative rounded-2xl border border-[#D4AF37] bg-[#111827] p-6 shadow-2xl shadow-black/20 overflow-hidden'>
            {' '}
            <div className='mb-6 flex items-center justify-between gap-3'>
              <h2 className='text-2xl font-bold text-[#D4AF37]'>My Bookings</h2>
              <span className='rounded-full bg-[rgba(212,175,55,0.14)] px-4 py-2 text-xs font-semibold text-[#F9FAFB]'>
                {bookings.length} booking{bookings.length === 1 ? '' : 's'}
              </span>
            </div>
            <div className='min-h-[300px]'>
              {bookingsLoading ? (
                <div className='absolute inset-0 flex items-center justify-center bg-[rgba(17,24,39,0.85)] backdrop-blur-sm z-10'>
                  <Loading variant='fire' text='Loading Bookings' />
                </div>
              ) : !bookings.length ? (
                <div className='flex h-[300px] items-center justify-center'>
                  <div className='rounded-xl border border-dashed border-[#D4AF37] p-5 text-sm text-[#9CA3AF]'>
                    No bookings yet. Book a table to see your reservations here.
                  </div>
                </div>
              ) : (
                <div className='space-y-4'>
                  {bookings.map(booking => (
                    <div
                      key={booking.id}
                      className='rounded-xl border border-[#D4AF37] bg-[rgba(17,24,39,0.82)] p-4'
                    >
                      <div className='flex flex-wrap items-start justify-between gap-3'>
                        <div>
                          <p className='text-lg font-bold text-[#F9FAFB]'>
                            {new Date(
                              booking.booking_date
                            ).toLocaleDateString()}
                          </p>
                          <p className='mt-1 text-sm text-[#9CA3AF]'>
                            {booking.booking_time}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-4 py-2 text-xs font-semibold ${
                            statusStyles[booking.status] ||
                            'bg-[#1F2937] text-[#F9FAFB]'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className='mt-4 rounded-lg border border-[#D4AF37] px-4 py-3'>
                        <p className='text-sm text-[#9CA3AF]'>Guests</p>
                        <p className='text-lg font-semibold text-[#F9FAFB]'>
                          {booking.guests}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Profile

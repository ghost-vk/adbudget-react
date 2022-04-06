import Clock from './Clock'

function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto">
        <div className="py-3">
          <div className="flex justify-between">
            <div>AppName</div>
            <div>
              <Clock />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

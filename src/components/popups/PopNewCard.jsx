
function PopNewCard() {
  const days = [
    ['28', '_other-month'], ['29', '_other-month'], ['30', '_other-month'],
    ['31', '_cell-day'], ['1', '_cell-day'], ['2', '_cell-day _weekend'],
    ['3', '_cell-day _weekend'], ['4', '_cell-day'], ['5', '_cell-day'],
    ['6', '_cell-day'], ['7', '_cell-day'], ['8', '_cell-day _current'],
    ['9', '_cell-day _weekend'], ['10', '_cell-day _weekend'],
    ['11', '_cell-day'], ['12', '_cell-day'], ['13', '_cell-day'],
    ['14', '_cell-day'], ['15', '_cell-day'], ['16', '_cell-day _weekend'],
    ['17', '_cell-day _weekend'], ['18', '_cell-day'], ['19', '_cell-day'],
    ['20', '_cell-day'], ['21', '_cell-day'], ['22', '_cell-day'],
    ['23', '_cell-day _weekend'], ['24', '_cell-day _weekend'],
    ['25', '_cell-day'], ['26', '_cell-day'], ['27', '_cell-day'],
    ['28', '_cell-day'], ['29', '_cell-day'], ['30', '_cell-day _weekend'],
    ['1', '_other-month _weekend'],
  ];

  return (
    <div className="pop-new-card" id="popNewCard">
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <a href="#" className="pop-new-card__close" aria-label="Закрыть окно">
              &#10006;
            </a>

            <div className="pop-new-card__wrap">
              <form className="pop-new-card__form form-new" id="formNewCard" action="#">
                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">Название задачи</label>
                  <input
                    className="form-new__input"
                    type="text"
                    name="name"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    autoFocus
                  />
                </div>

                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">Описание задачи</label>
                  <textarea
                    className="form-new__area"
                    name="text"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                  />
                </div>
              </form>

              <div className="pop-new-card__calendar calendar">
                <p className="calendar__ttl subttl">Даты</p>
                <div className="calendar__block">
                  <div className="calendar__nav">
                    <div className="calendar__month">Сентябрь 2023</div>
                    <div className="nav__actions">
                      <div className="nav__action" data-action="prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                          <path d="M5.7 1.95 1.88 5.5l3.85 3.55" fill="none" stroke="currentColor" />
                        </svg>
                      </div>
                      <div className="nav__action" data-action="next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                          <path d="m0.3 1.95 3.85 3.55-3.85 3.55" fill="none" stroke="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="calendar__content">
                    <div className="calendar__days-names">
                      {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((day, index) => (
                        <div
                          className={`calendar__day-name ${index > 4 ? '-weekend-' : ''}`}
                          key={day}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="calendar__cells">
                      {days.map(([day, classNames], index) => (
                        <div className={`calendar__cell ${classNames}`} key={`${day}-${index}`}>
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  <input type="hidden" id="datepick_value" value="08.09.2023" />
                  <div className="calendar__period">
                    <p className="calendar__p date-end">
                      Выберите срок исполнения <span className="date-control" />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                <div className="categories__theme _orange _active-category">
                  <p className="_orange">Web Design</p>
                </div>
                <div className="categories__theme _green">
                  <p className="_green">Research</p>
                </div>
                <div className="categories__theme _purple">
                  <p className="_purple">Copywriting</p>
                </div>
              </div>
            </div>

            <button type="button" className="form-new__create _hover01" id="btnCreate">
              Создать задачу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopNewCard;

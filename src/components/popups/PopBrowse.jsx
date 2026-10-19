
function PopBrowse() {
  const days = [
    ['28', '_other-month'], ['29', '_other-month'], ['30', '_other-month'],
    ['31', '_cell-day'], ['1', '_cell-day'], ['2', '_cell-day _weekend'],
    ['3', '_cell-day _weekend'], ['4', '_cell-day'], ['5', '_cell-day'],
    ['6', '_cell-day'], ['7', '_cell-day'], ['8', '_cell-day _current'],
    ['9', '_cell-day _weekend _active-day'], ['10', '_cell-day _weekend'],
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
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">Название задачи</h3>
              <div className="categories__theme theme-top _orange _active-category">
                <p className="_orange">Web Design</p>
              </div>
            </div>

            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                <div className="status__theme _hide"><p>Без статуса</p></div>
                <div className="status__theme _gray"><p className="_gray">Нужно сделать</p></div>
                <div className="status__theme _hide"><p>В работе</p></div>
                <div className="status__theme _hide"><p>Тестирование</p></div>
                <div className="status__theme _hide"><p>Готово</p></div>
              </div>
            </div>

            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse" id="formBrowseCard" action="#">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-browse__area"
                    name="text"
                    id="textArea01"
                    readOnly
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

                  <input type="hidden" id="datepick_value" value="09.09.2023" />
                  <div className="calendar__period">
                    <p className="calendar__p date-end">
                      Срок исполнения: <span className="date-control">09.09.23</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__theme _orange _active-category">
                <p className="_orange">Web Design</p>
              </div>
            </div>

            <div className="pop-browse__btn-browse">
              <div className="btn-group">
                <button type="button" className="btn-browse__edit _btn-bor _hover03">
                  <a href="#popBrowse">Редактировать задачу</a>
                </button>
                <button type="button" className="btn-browse__delete _btn-bor _hover03">
                  <a href="#popBrowse">Удалить задачу</a>
                </button>
              </div>
              <button type="button" className="btn-browse__close _btn-bg _hover01">
                <a href="#">Закрыть</a>
              </button>
            </div>

            <div className="pop-browse__btn-edit _hide">
              <div className="btn-group">
                <button type="button" className="btn-edit__edit _btn-bg _hover01">Сохранить</button>
                <button type="button" className="btn-edit__edit _btn-bor _hover03">Отменить</button>
                <button type="button" className="btn-edit__delete _btn-bor _hover03" id="btnDelete">
                  Удалить задачу
                </button>
              </div>
              <button type="button" className="btn-edit__close _btn-bg _hover01">Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopBrowse;

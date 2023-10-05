import Notiflix from 'notiflix';
const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);
function onSubmitForm(evt) {
  evt.preventDefault();
  let delay = Number(form.delay.value);
  if (form.step.value < 0 || form.delay.value < 0 || form.amount.value <= 0) {
    Notiflix.Notify.warning(`❗Please enter a value > 0`, { position: 'center-top', distance: '200px'});
  } else {
    for (let i = 1; i <= Number(form.amount.value); i += 1) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      delay += Number(form.step.value);
    }
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
       resolve ({ position, delay })
     } else {
       reject ({ position, delay })
     } 
    }, delay)
  });
  };
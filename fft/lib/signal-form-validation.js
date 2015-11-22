function validateSignalConfig(maxSamplingStep) {
  $('#signal-config-form').validate({
    rules: {
      sampling_step: {
        required: true,
        min: 0,
        max: maxSamplingStep
      }
    },
    errorPlacement: function(e) { return true },
    errorClass: 'has-error',
    highlight: function(elem, errorClass, validClass) {
      $(elem).parent().addClass(errorClass);
    },
    unhighlight: function(elem, errorClass, validClass) {
      $(elem).parent().removeClass(errorClass);
    }
  });
}

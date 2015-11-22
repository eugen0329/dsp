function validateSignalConfig(maxSamplingStep) {
  $('#signal-config-form').validate({
    rules: {
      sampling_step: {
        required: true,
        min: 0,
        max: maxSamplingStep
      },
      counts: {
        required: true,
        pow2: true
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

jQuery.validator.addMethod("pow2", function(val, elem) {
  return this.optional(elem) || Number.isInteger(Math.log2(val));
}, "Please specify the correct domain for your documents");
